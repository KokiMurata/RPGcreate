#==============================================================================
# ○RGSS2立ち絵まばたき
#立ち絵を瞬きさせます
#作成者：riru/ガラス細工の夢幻
#http://garasuzaikunomugen.web.fc2.com/index.html
#==============================================================================
#まばたき用間隔。それぞれの時間で瞬き、RIRU_PICTURE_ROOP_COUNT3＋15の時間で一周します
RIRU_PICTURE_ROOP_COUNT1 = 70
RIRU_PICTURE_ROOP_COUNT2 = 100
RIRU_PICTURE_ROOP_COUNT3 = 170
class Game_Interpreter
#--------------------------------------------------------------------------
# ● まばたき用ピクチャの表示
#--------------------------------------------------------------------------
  def roop_picture(layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror=false)
    if $game_temp.in_battle#バトル中
      $game_troop.roop_picture_count(layer)
      $game_troop.create_roop_picture(layer,name,name2,origin,x, y,zoom_x,zoom_y,opacity,blend_type,mirror)
    else
      $game_map.roop_picture_count(layer)
      $game_map.create_roop_picture(layer,name,name2,origin,x, y,zoom_x,zoom_y,opacity,blend_type,mirror)
    end
  end
#--------------------------------------------------------------------------
# ● まばたき用ピクチャの消去
#--------------------------------------------------------------------------
  def erase_roop_picture(layer)
    if $game_temp.in_battle#バトル中
      $game_troop.erase_roop_picture(layer)
    else
      $game_map.erase_roop_picture(layer)
    end
  end
end
class Game_Map
  #--------------------------------------------------------------------------
  # ● フレーム更新
  #--------------------------------------------------------------------------
  alias picture_roop_update update
  def update
    picture_roop_update
    if @roop_picture_count != nil
      for layer in @roop_pictures
        next if layer == nil
        next if @roop_picture_count[layer[0]] == nil
        @roop_picture_count[layer[0]] += 1
        roop_picture(layer[0],layer[1],layer[2], layer[3], layer[4], layer[5], layer[6], layer[7], layer[8], layer[9])
      end
    end  
  end
#--------------------------------------------------------------------------
# ● ループピクチャの情報作成
#--------------------------------------------------------------------------
  def create_roop_picture(layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror)
    @roop_pictures = [] if @roop_pictures == nil
    @roop_pictures[layer] = [layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror]
  end 
#--------------------------------------------------------------------------
# ● まばたき用ピクチャループ
#--------------------------------------------------------------------------
  def roop_picture(layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror)
    count = RIRU_PICTURE_ROOP_COUNT1
    case @roop_picture_count[layer]
    when count
      #閉じかけ目表示
      @screen.pictures[layer].show(name,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
     p_mirror(layer) if mirror == true
    when count+10
      #閉じかけ目表示
      @screen.pictures[layer].show(name,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
      p_mirror(layer) if mirror == true
    when count+5
      #閉じ目表示
      @screen.pictures[layer].show(name2,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
      p_mirror(layer) if mirror == true
    when count+15
      @screen.pictures[layer].erase
    when RIRU_PICTURE_ROOP_COUNT1+1
      count = RIRU_PICTURE_ROOP_COUNT2
    when RIRU_PICTURE_ROOP_COUNT2+1
      count = RIRU_PICTURE_ROOP_COUNT3
    when RIRU_PICTURE_ROOP_COUNT3+15
      @screen.pictures[layer].erase
      @roop_picture_count[layer] = 0
    end  
  end
#--------------------------------------------------------------------------
# ● まばたき用ピクチャの消去
#--------------------------------------------------------------------------
  def erase_roop_picture(layer)
    @roop_picture_count[layer] = nil
    @roop_pictures[layer] = nil
    @screen.pictures[layer].erase
  end
#--------------------------------------------------------------------------
# ● ピクチャの反転
#--------------------------------------------------------------------------  
  def p_mirror(n, m = nil)
    if m == nil
      @screen.pictures[n].mirror ^= true
    else
      @screen.pictures[n].mirror = m
    end
  end 

#--------------------------------------------------------------------------
# ●まばたきループカウントの取得
#--------------------------------------------------------------------------  
  def roop_picture_count(layer)
    @roop_picture_count = [] if @roop_picture_count == nil
    @roop_picture_count[layer] = 0
  end  
end
class Game_Troop < Game_Unit
   #--------------------------------------------------------------------------
  # ● フレーム更新
  #--------------------------------------------------------------------------
  alias picture_roop_update update
  def update
    picture_roop_update
    if @roop_picture_count != nil
      for layer in @roop_pictures
        next if layer == nil
        next if @roop_picture_count[layer[0]] == nil
        @roop_picture_count[layer[0]] += 1
        roop_picture(layer[0],layer[1],layer[2], layer[3], layer[4], layer[5], layer[6], layer[7], layer[8], layer[9])
      end
    end  
  end
#--------------------------------------------------------------------------
# ● ループピクチャの情報作成
#--------------------------------------------------------------------------
  def create_roop_picture(layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror)
    @roop_pictures = [] if @roop_pictures == nil
    @roop_pictures[layer] = [layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror]
  end 
#--------------------------------------------------------------------------
# ● まばたき用ピクチャループ
#--------------------------------------------------------------------------
  def roop_picture(layer,name,name2, origin, x, y, zoom_x, zoom_y, opacity, blend_type,mirror)
    count = RIRU_PICTURE_ROOP_COUNT1
    case @roop_picture_count[layer]
    when count
      #閉じかけ目表示
      @screen.pictures[layer].show(name,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
      p_mirror２(layer) if mirror == true
    when count+10
      #閉じかけ目表示
      @screen.pictures[layer].show(name,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
      p_mirror２(layer) if mirror == true
    when count+5
      #閉じ目表示
      @screen.pictures[layer].show(name2,origin,x, y,zoom_x,zoom_y,opacity,blend_type)
      ピクチャの反転２(layer) if mirror == true
    when count+15
      @screen.pictures[layer].erase
    when RIRU_PICTURE_ROOP_COUNT1+1
      count = RIRU_PICTURE_ROOP_COUNT2
    when RIRU_PICTURE_ROOP_COUNT2+1
      count = RIRU_PICTURE_ROOP_COUNT3
    when RIRU_PICTURE_ROOP_COUNT3+15
      @screen.pictures[layer].erase
      @roop_picture_count[layer] = 0
    end  
  end
#--------------------------------------------------------------------------
# ● まばたき用ピクチャの消去
#--------------------------------------------------------------------------
  def erase_roop_picture(layer)
    @roop_picture_count[layer] = nil
    @roop_pictures[layer] = nil
    @screen.pictures[layer].erase
  end
#--------------------------------------------------------------------------
# ● ピクチャの反転
#--------------------------------------------------------------------------  
  def p_mirror(n, m = nil)
    if m == nil
      @screen.pictures[n].mirror ^= true
    else
      @screen.pictures[n].mirror = m
    end
  end 
#--------------------------------------------------------------------------
# ●まばたきループカウントの取得
#--------------------------------------------------------------------------  
  def roop_picture_count(layer)
    @roop_picture_count = [] if @roop_picture_count == nil
    @roop_picture_count[layer] = 0
  end  
end  